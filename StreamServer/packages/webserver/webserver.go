package webserver

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

// Хранение данных стримов
type dataofstream struct {
	streamid   string
	firstframe []byte
	data       []byte
}

var arrayofstreams []dataofstream

var streamid string

func cors(fs http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4444/")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With")
		streamid = r.Header.Get("Cookie")
		//fmt.Println(streamid[9:])

		fs.ServeHTTP(w, r)
	}
}

func Webserver() {
	fileSystem := http.Dir("./static")
	fileServer := http.FileServer(fileSystem)

	http.Handle("/", cors(fileServer))
	http.HandleFunc("/sendvideo", getVideo)
	http.HandleFunc("/getvideo", broadcastVideo)
	fmt.Println("Server start on port: 4444")
	http.ListenAndServe(":4444", nil)
}

var b []byte
var firstchunck []byte
var flag = false //Чтобы один раз записать первый чанк
var flag2 = true //Чтобы один раз отправить первый чанк, а дальше уже самый новый отправлять

//Но в этих флагах есть проблема, что если перезапустить стрим без перезапуска сервера, то чанки не будут друг с другом работать так как они будут из разных видео

func getVideo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4444/")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With")

	//var dataofstream dataofstream
	//dataofstream.streamid = r.Header.Get("Cookie")

	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Fatalln(err)
	}
	defer r.Body.Close()

	b = body

	if !flag {
		firstchunck = body
		//dataofstream.firstframe = body
		flag = true
	}

	//dataofstream.data = body

	// var answer = true
	// var index = 0

	// for i, data := range arrayofstreams {
	// 	if data.streamid != r.Header.Get("Cookie") {
	// 		answer = false
	// 		index = i
	// 	} else {
	// 		answer = true
	// 		index = i
	// 	}
	// }

	// if !answer {
	// 	arrayofstreams = append(arrayofstreams, dataofstream)
	// } else {
	// 	arrayofstreams[index].data = body
	// }

	//Для полной записи добавить в параметры os.O_APPEND
	//file, err := os.OpenFile("./static/streams/"+streamid[9:]+".txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	file, err := os.OpenFile("/var/lib/docker/volumes/videos/_data/"+streamid[9:]+".txt", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		fmt.Println("Unable to create file:", err)
		os.Exit(1)
	}

	if _, err = file.WriteString(string(body)); err != nil {
		panic(err)
	}
	defer file.Close()
}

func broadcastVideo(w http.ResponseWriter, r *http.Request) {
	//Можно хранить самый первый и самый новый чанк для каждой трансляции в оперативной памяти
	//Реализовать можно в виде обычного массива, возможно многомерного
	//Или один массив со списками с двумя элементами
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4444/")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Content-Length")

	//fmt.Println(streamid[9:])

	var ff = true

	for _, data := range arrayofstreams {
		if data.streamid == r.Header.Get("Cookie")[9:] {
			if ff {
				w.Write(data.firstframe)
				ff = false
			} else {
				w.Write(data.data)
			}
		}
	}

	if flag2 {
		w.Write(firstchunck)
		flag2 = false
	} else {
		w.Write(b)
	}
}
