import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: "2m", target: 100 },
        { duration: "5m", target: 100 },
        { duration: "2m", target: 200 },
        { duration: "5m", target: 200 },
        { duration: "2m", target: 300 },
        { duration: "5m", target: 300 },
        { duration: "2m", target: 400 },
        { duration: "5m", target: 400 },
        { duration: "10m", target: 500 },
    ]
}

export default () => {
    http.get(__ENV.BASE_URL + "/api/post/list/All/Post");
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}