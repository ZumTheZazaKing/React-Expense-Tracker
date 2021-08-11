export function MoneyTeller(props){

    return <div className="money">
        <div className="balance">
            <h3>YOUR BALANCE</h3>
            <p>{props.currencyUnit} {props.balance}</p>
        </div>
        <div className="others">
            <div className="income">
                <h3>INCOME</h3>
                <p>{props.currencyUnit} {props.income}</p>
            </div>
            <div className="expense">
                <h3>EXPENSE</h3>
                <p>{props.currencyUnit} {Math.abs(props.expense)}</p>
            </div>
        </div>
    </div>
}