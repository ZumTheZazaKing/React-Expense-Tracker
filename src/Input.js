export function Input(props){
    return <div className="input">
        <h4>Add new transaction</h4>
        <hr/>
        <form onSubmit={props.processTransaction}>
            <br/>
            <label>Transaction Subject (max. 20 words):</label><br/>
            <input type="Text" placeholder="e.g. Food, Income..." value={props.inputTitle} maxLength={20} onChange={props.changeTitle} required/>
            <br/><br/>
            <label>Amount:<br/>e.g. 50 = Income<br/>e.g. -50 = Expense ('-' added in front)</label><br/>
            <input type="number" placeholder="e.g. 50, -50" value={props.inputAmount} onChange={props.changeAmount} required/>
            <br/><br/>
            <input type="submit" value="Add Transaction"/>
        </form>
    </div>
}