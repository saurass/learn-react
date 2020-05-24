import React, { useState } from 'react';
import Icon from './components/Icon';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css";

const itemArray = new Array(9).fill("empty");

const App = (props) => {

    const [cross, setCross] = useState(false);
    const [winMessage, setWinMessage] = useState("");
    // const [itemArray, setItemArray] = useState(itemArray)

    const reloadgame = () => {
        setCross(false);
        setWinMessage("")
        itemArray.fill("empty", 0, 9);
    }

    const checkIsWinner = () => {
        //  checking  winner of the game
        if (
            itemArray[0] === itemArray[1] &&
            itemArray[0] === itemArray[2] &&
            itemArray[0] !== "empty"
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (
            itemArray[3] !== "empty" &&
            itemArray[3] === itemArray[4] &&
            itemArray[4] === itemArray[5]
        ) {
            setWinMessage(`${itemArray[3]} won`);
        } else if (
            itemArray[6] !== "empty" &&
            itemArray[6] === itemArray[7] &&
            itemArray[7] === itemArray[8]
        ) {
            setWinMessage(`${itemArray[6]} won`);
        } else if (
            itemArray[0] !== "empty" &&
            itemArray[0] === itemArray[3] &&
            itemArray[3] === itemArray[6]
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (
            itemArray[1] !== "empty" &&
            itemArray[1] === itemArray[4] &&
            itemArray[4] === itemArray[7]
        ) {
            setWinMessage(`${itemArray[1]} won`);
        } else if (
            itemArray[2] !== "empty" &&
            itemArray[2] === itemArray[5] &&
            itemArray[5] === itemArray[8]
        ) {
            setWinMessage(`${itemArray[2]} won`);
        } else if (
            itemArray[0] !== "empty" &&
            itemArray[0] === itemArray[4] &&
            itemArray[4] === itemArray[8]
        ) {
            setWinMessage(`${itemArray[0]} won`);
        } else if (
            itemArray[2] !== "empty" &&
            itemArray[2] === itemArray[4] &&
            itemArray[4] === itemArray[6]
        ) {
            setWinMessage(`${itemArray[2]} won`);
        }
    }

    const changeItem = itemNumber => {
        if (winMessage) {
            return toast(winMessage, { type: "success" })
        }

        if (itemArray[itemNumber] === "empty") {
            itemArray[itemNumber] = cross ? "cross" : "circle";
            setCross(!cross);
        } else {
            return toast("already filled", { type: "error" });
        }

        checkIsWinner();
    }

    return (
        <Container className="p-5">
            <ToastContainer position="bottom-center" />
            <Row>
                <Col md={6} className="offset-md-3">
                    {winMessage ? (
                        <div className="my-2">
                            <h1 className="text-primary text-uppercase text-center">
                                {winMessage}
                            </h1>
                            <Button color="success" block onClick={reloadgame}>ResetButton</Button>
                        </div>
                    ) : (
                            <h1 className="text-center text-warning">
                                {cross ? "Cross Turn" : "Circle Turn"}
                            </h1>
                        )}
                    <div className="grid">
                        {itemArray.map((item, index) => (
                            <Card className="box" color="primary" onClick={() => { changeItem(index) }}>
                                <Icon name={item} />
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default App;