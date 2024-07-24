import { useState } from 'react'
import styled from 'styled-components'
import { Address, comment, toNano } from 'ton'
import { useTonConnect } from '../hooks/useTonConnect'
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from './styled/styled'

export function TransferTon() {
    const { sender, connected } = useTonConnect()

    const [text, settext] = useState('')
    const [tonAmount, setTonAmount] = useState('0.01')
    const [tonRecipient, setTonRecipient] = useState(
        'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'
    )

    return (
        <Card>
            <FlexBoxCol>
                <h3>Transfer TON</h3>
                <FlexBoxRow>
                    <label>Amount </label>
                    <Input
                        style={{ marginRight: 8 }}
                        type="number"
                        value={tonAmount}
                        onChange={(e) => setTonAmount(e.target.value)}
                    ></Input>
                </FlexBoxRow>
                <FlexBoxRow>
                    <label>To </label>
                    <Input
                        style={{ marginRight: 8 }}
                        value={tonRecipient}
                        onChange={(e) => setTonRecipient(e.target.value)}
                    ></Input>
                </FlexBoxRow>

                {/* Comment */}
                <FlexBoxRow>
                    <label>Comment </label>
                    <Input
                        style={{ marginRight: 8 }}
                        value={tonRecipient}
                        onChange={(e) => settext(e.target.value)}
                    ></Input>
                </FlexBoxRow>

                <Button
                    disabled={!connected}
                    style={{ marginTop: 18 }}
                    onClick={async () => {
                        sender.send({
                            to: Address.parse(tonRecipient),
                            value: toNano(tonAmount),
                            body: comment(text)
                        })
                    }}
                >
                    Transfer
                </Button>
            </FlexBoxCol>
        </Card>
    )
}
