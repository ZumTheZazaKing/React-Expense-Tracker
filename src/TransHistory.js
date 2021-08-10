export function TransHistory(props){

    const historyArr = props.history;
    const historyList = historyArr.map(history => <li>{history.title} | {history.amount}</li>);
    const shortenedHistoryList = historyArr.slice(0,5).map(history => <li>{history.title} | {history.amount}</li>);

    return <div>
        <h3>History</h3>
        <ul>{shortenedHistoryList}</ul>
    </div>
}