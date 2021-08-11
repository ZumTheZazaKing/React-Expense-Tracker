export function Input(props){
    return <div className="input">
        <h4>Add new transaction</h4>
        <hr/>
        <form onSubmit={props.processTransaction}>
            <br/>
            <label>Title:</label><br/>
            <input type="Text" placeholder="No more than 20 words" value={props.inputTitle} maxLength={20} onChange={props.changeTitle} required/>
            <br/><br/>
            <label>Amount:<br/>e.g. 50 = Income<br/>e.g. -100 = Expense</label><br/>
            <input type="number" placeholder="e.g. 50, -100" value={props.inputAmount} onChange={props.changeAmount} required/>
            <br/><br/>
            <input type="submit" value="Add Transaction"/>
        </form>
    </div>
}