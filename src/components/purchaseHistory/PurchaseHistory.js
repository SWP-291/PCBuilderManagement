import {Row, Table, Button} from 'react-bootstrap'
import order from '../assets/image/order.png'
import './PurchaseHistory.scss'
// import pc from '../assets/image/PC1.png'
import { useNavigate } from 'react-router-dom'
const History = () => {
    const navigate = useNavigate();
    const handleDetail =() =>{
        navigate('/orderdetail');
    }
    return(
        <div className="py-5 history">
            <div className="container">
                <Row>
                    <h1>ORDER MANAGEMENT</h1>
                </Row>
                <Row>
                    <img src = {order} alt =''/>
                    <p>2 <span>orders</span></p>
                </Row>
                <Table striped hover >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="" alt =''/></td>
                            <td><strong></strong></td>
                            <td></td>
                            <td style={{color: 'red'}}>VND</td>
                            <td><Button onClick={()=> handleDetail()}>See details</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default History