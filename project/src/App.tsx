import {useState} from 'react'
import {TableItems} from './TableItems';

function App() {
  const [data, setData] = useState<Array<Record<string, string>>>(
    [
      { name: "Ivan", lastName: "Ivanov" },
      { name: "Иван", lastName: "Иванов" },
    ]
  )

  const onChangeValueCell = (newValue: string, prevValue: string) => {
      const newArr = data.map((item: Record<string, string>) => {
        const newItem = {...item};
        for (const key in newItem) {
          if (newItem[key] === prevValue) {
            newItem[key] = newValue;
          }
        }
        return newItem;
      })
      setData(newArr)
  }
   
    
  return (
    <>
      <h1>Приложуха</h1>
      <TableItems 
        data={data}
        onChangeValueCell={onChangeValueCell}
        // header={['Имя', 'Фамилия']}
      />
    </>
  )
}

export default App
