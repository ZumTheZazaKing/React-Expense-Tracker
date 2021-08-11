export function TransHistory(props){

    const historyArr = props.history;
    const historyList = historyArr
    .map(history => <li className={history.amount.search(/-/g) !== -1 ? "expense" : "income"}>
        {history.title} |<span> {history.time} </span>| {history.amount}
        </li>);

    const shortenedHistoryList = historyArr
    .slice(0,4)
    .map(history => <li className={history.amount.search(/-/g) !== -1 ? "expense" : "income"}>
        {history.title} |<span> {history.time} </span>| {history.amount}
        </li>);

    return <div className="history">
        <h4>History <span onClick={e => props.historyAllRef.current.className=""}>VIEW ALL</span></h4>
        <hr/>
        <ul>{shortenedHistoryList}</ul>
        <div id="historyAll" className="hide" ref={props.historyAllRef}>
            <div id="historyAllContent">
                <p onClick={e => props.historyAllRef.current.className="hide"}>&times;</p>
                <h2>History</h2>
                <ul>{historyList}</ul>
            </div>
        </div>
    </div>
}