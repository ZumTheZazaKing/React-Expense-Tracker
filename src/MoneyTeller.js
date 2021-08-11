export function MoneyTeller(props){

    return <div className="money">
        <div className="balance">
            <h3>YOUR BALANCE</h3>
            <p>${props.balance}</p>
        </div>
        <div className="others">
            <div className="income">
                <h3>INCOME</h3>
                <p>${props.income}</p>
            </div>
            <div className="expense">
                <h3>EXPENSE</h3>
                <p>${Math.abs(props.expense)}</p>
            </div>
        </div>
    </div>
}