export function Input(){
    return <div>
        <h3>Add new transaction</h3>
        <form>
            <label>Title</label><br/>
            <input type="Text" required/>
            <br/><br/>
            <label>Amount</label><br/>
            <input type="number" required/>
            <br/><br/>
            <input type="submit" value="Add Transaction"/>
        </form>
    </div>
}