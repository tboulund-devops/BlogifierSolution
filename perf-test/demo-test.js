import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: "2m", target: 100 },
        { duration: "1m", target: 100},
        { duration: "1m", target: 0 }
    ],
    //vus: 500,
    //duration: "10s"
}

export default function() {
    http.get("http://localhost:9876/api/post/list/All/Post")
}