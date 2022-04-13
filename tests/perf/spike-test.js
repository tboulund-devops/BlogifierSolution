import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: "20s", target: 200 },
        { duration: "10s", target: 200},
        { duration: "10s", target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.01']
    }
}

export default function() {
    http.get("http://localhost:9876/api/post/list/All/Post")
}