export function MoneyTeller(props){

    return <div>
        <h3>YOUR BALANCE</h3>
        <h2>${props.balance}</h2>
        <h3>INCOME</h3>
        <h3>${props.income}</h3>
        <h3>EXPENSE</h3>
        <h3>${props.expense}</h3>
    </div>
}