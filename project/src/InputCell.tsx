type InputCellProps = {
  cellId: string;
  inputValue: string;
  saveNewValueCell: () => void;
  setValue: (value: string) => void;
  setEditId: (id: string) => void
}

export const InputCell = (props: InputCellProps) => {
  const {cellId, inputValue, setValue, saveNewValueCell, setEditId} = props;

  return (
    <div style={{display: "flex", width: "100%"}} key={cellId}>
      <input
        value={inputValue}
        style={{textAlign: "start", width: "100%", border: "2px solid red", background: "#FFFAFA"}}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => {saveNewValueCell(); setEditId('')}}>OK</button>
    </div>
  )
}
