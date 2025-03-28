import { useEffect, useState } from "react";
import { InputCell } from './InputCell'

type RowType<T> = { 
    [K in keyof T]: T[K]
  }

type TableItemProps = {
  data: Array<Record<string, string>>;
  onChangeValueCell: (newValue: string, prevValue: string) => void;
  header?: string[];
};

export const TableItems = (props: TableItemProps) => {
  const { data, onChangeValueCell, header } = props;
  const [editId, setEditId] = useState('');
  const [inputValue, setValue] = useState('');
  const [prevValue, setPrevValue] = useState('');

  const handleEscape = (e: KeyboardEvent) => {
    if(e.code === "Escape"){
        console.log(e.code)
        setEditId('')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    
    return () => {
        document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const saveNewValueCell = () => {
    onChangeValueCell(inputValue, prevValue);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: 'flex', flex: 1, border: "1px solid grey", backgroundColor: "aqua", textAlign: "center"}}>
        {(header ? header : Object.keys(data[0])).map((headerCell: string, index: number) =>
          <div style={{ width: '100%', border: "1px solid grey"}} key={`${JSON.stringify(headerCell)}${index}`}>{headerCell}</div>)}
      </div>
      {data.map((row: RowType<Record<string, string>>, rowIndex: number) => {
        const newArr = Object.values(row).map((cell) => cell);

        return (
          <div style={{ display: "flex" }} key={`${JSON.stringify(row)}${rowIndex}`}>
              {newArr.map((cell: string, cellIndex) => {
                const cellId = `${cell}-${cellIndex}-${rowIndex}`;
                return (
                  editId === cellId ? 
                    <InputCell
                      cellId={cellId}
                      inputValue={inputValue}
                      setValue={setValue}
                      saveNewValueCell={saveNewValueCell}
                      setEditId={setEditId}
                    />
                    : (<div
                        style={{
                          textAlign: "start",
                          width: "100%",
                          border: "1px solid grey",
                        }}
                        key={cellId}
                        onClick={() => {
                          setEditId(cellId);
                          setValue(cell);
                          setPrevValue(cell);
                        }}
                      >
                        {cell}
                      </div>)
                    )
                })
              }
            </div>
        );
      })}
    </div>
  );
};
