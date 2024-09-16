
       async  function submiti(e){
        e.preventDefault()
       await fetch('/',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({url:document.querySelector('input[name="url"]').value})
        })
        .then(async res=>{
            console.log(res)
            if(res.ok){
                const data=await res.json()
                const {url}=data
                console.log(url)
                document.querySelector('#url').innerHTML=`Your short url is:<b> ${url}</b>`
            }
            else
                console.log('sorry')
        })
        .catch(err=>console.log(err))
    }


function displayAll(){
    fetch('../all')
    .then(data=>data.json())
    .then(data=>{
        const {urls}=data
        var text='<table><tr><th>URL</th><th>short URL</th> <th>Clicks</th></tr>'
        urls.forEach(url => {
            text+=`<tr><td>${url.URL} </td> <td>${url.shortURL} </td>  <td>${url.clicks}</td></tr>`
        });
        text+='</table>'
        document.querySelector('#urls').innerHTML=text
    })
    .catch(err=>console.log(err))
}