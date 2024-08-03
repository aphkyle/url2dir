const manager = async (downloadItem, suggest)=>{
    let rules = JSON.parse(localStorage.rules)

    let url = new URL(downloadItem.url)
    for (const [rule, dir] of Object.entries(rules)) {
        if (url.hostname == rule){
            suggest({filename: `${dir}/${downloadItem.filename}`})
        }
    }
    console.log(downloadItem.url)
    console.log(downloadItem.referrer)
    suggest()
}

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest)=>{
    manager(downloadItem, suggest)
})