const manager = async (downloadItem, suggest)=>{
    chrome.storage.sync.get("rules", result=>{
        let rules = result.rules
        let url = new URL(downloadItem.url)
        console.log(downloadItem.url)
        console.log(downloadItem.referrer)
        console.log(rules)
        rules.forEach(rule => {
            // console.log(url.hostname)
            // console.log(rule.rule)
            // console.log(url.hostname === rule.rule)
            // console.log(rule)
            // console.log(`${rule.dir}/${downloadItem.filename}`)
            if (url.hostname === rule.rule){
                suggest({filename: `${rule.dir}/${downloadItem.filename}`, conflictAction: "uniquify"})
            }
        });
    })
}

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest)=>{
    manager(downloadItem, suggest)
    return true
})