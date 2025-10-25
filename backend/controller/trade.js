export const searchSymbol = (req,res,next)=>{
    const keyWord = req.params.keyword;
    console.log("Searching for keyword:", keyWord);
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=${process.env.API_key}`)
    .then(response => response.json())
    .then(data => {
        res.status(200).json(data);
        console.log(data);
    })
    .catch(error => {
        res.status(500).json({message : "Error fetching data"});
    });
}

export const intraDayData = (req,res,next)=>{
    const symbol = req.params.symbol;
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&outputsize=full&apikey=${process.env.API_key}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(500).json({message : "Error fetching data"});
    });
}

