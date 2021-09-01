import { useState } from 'react'
import { Button, Table, Input } from 'semantic-ui-react'

export default (props) => {
    const id = 'hmgev9ho8p45vh8m90g4v598m54vh9m84v50mb456hvw0j,-9w4bh,0-'
    const [name, setName] = useState('')
    const [alreadyWorked, setAlreadyWorked] = useState('')
    const [totalMinutes, setTotalMinutes] = useState('')
    const [errName, setErrName] = useState(false)
    const [errTotalMinutes, setErrTotalMinutes] = useState(false)

    const isInt = (data) => (data == parseInt(data, 10))

    const saveProject = () => {
        if (name === '' || totalMinutes === '') {
            setErrName(name === '')
            setErrTotalMinutes(totalMinutes === '')
        } else {
            props.addProject(name, Number.parseInt(totalMinutes),  Number.parseInt(alreadyWorked))
            setName('')
            setAlreadyWorked('')
            setTotalMinutes('')
        }
    }
    return (
        <Table.Row>
            <Table.Cell style={{ paddingLeft: '1em' }}>
                <Button
                    basic
                    size='small'
                    color='green'
                    floated='left'
                    content='Save'
                    onClick={() => saveProject()}
                />
            </Table.Cell>
            <Table.Cell>
                <Input
                    placeholder='Project Name'
                    value={name}
                    error={errName}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </Table.Cell>
            <Table.Cell>
                <Input
                    placeholder='Already worked (min)'
                    error={!(isInt(alreadyWorked) || alreadyWorked === '')}
                    value={alreadyWorked}
                    onChange={(e) => { setAlreadyWorked(e.target.value) }}
                />
            </Table.Cell>
            <Table.Cell>
                <Input
                    placeholder='Total minutes'
                    error={!(isInt(totalMinutes) || totalMinutes === '') || errTotalMinutes}
                    value={totalMinutes}
                    onChange={(e) => { setTotalMinutes(e.target.value) }}
                />
            </Table.Cell>
            <Table.Cell></Table.Cell>
        </Table.Row >
    )
}