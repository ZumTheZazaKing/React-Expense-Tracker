export function TransHistory(props){

    const historyArr = props.history;
    const historyList = historyArr.map(history => <li>{history.title} | {history.amount}</li>);
    const shortenedHistoryList = historyArr
    .slice(0,4)
    .map(history => <li className={history.amount.search(/-/g) !== -1 ? "expense" : "income"}>
        {history.title}<span>{history.amount}</span>
        </li>);

    return <div className="history">
        <h4>History</h4>
        <hr/>
        <ul>{shortenedHistoryList}</ul>
    </div>
}