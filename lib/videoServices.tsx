
export const getVimeoLinks = async (url: string) => {
    return fetch(`https://vimeo.com/api/oembed.json?url=${url}`, {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        }
    })
        .then(r => r.json())
        .then(({ video_id }) => fetch(`https://player.vimeo.com/video/${video_id}/config`))
        .then(r => r.json())
        .then(r => r.request.files.progressive)
        .catch(error => console.log(error, "error"))
}