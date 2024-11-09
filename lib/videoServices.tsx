
export const getVimeoLinks = async (url: string) => {
    return fetch(`https://vimeo.com/api/oembed.json?url=${url}`, {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        }
    })
        .then(r => { console.log(r, "1"); return r.json() })
        .then(({ video_id }) => {
            console.log(video_id, "2");
            return fetch(`https://player.vimeo.com/video/${video_id}/config`)
        })
        .then(r => { console.log(r, "3"); return r.json() })
        .then(r => { console.log(r, "4"); return r.request.files.progressive })
        .catch(error => console.log(error, "error"))
}