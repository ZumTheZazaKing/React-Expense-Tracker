export function Input(props){
    return <div>
        <h3>Add new transaction</h3>
        <form onSubmit={props.processTransaction}>
            <label>Title</label><br/>
            <input type="Text" value={props.inputTitle} onChange={props.changeTitle} required/>
            <br/><br/>
            <label>Amount<br/>(negative - expense, positive - income)</label><br/>
            <input type="number" value={props.inputAmount} onChange={props.changeAmount} required/>
            <br/><br/>
            <input type="submit" value="Add Transaction"/>
        </form>
    </div>
}