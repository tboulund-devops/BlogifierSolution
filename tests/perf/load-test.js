import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  thresholds: {
    http_req_duration: ['p(100)<200']
  },
  duration: "10s",
  vus: 10
};

export default function () {
  http.get(__ENV.BASE_URL + "/api/post/list/All/Post");
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}