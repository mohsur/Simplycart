import {React,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap';
import Rating from "../components/Rating";
import axios from 'axios';
const ProductScreen=()=> {
    const [product,setProduct]=useState({});
 const {id:productId}=useParams();
 useEffect(()=>{
 const fetchProduct= async()=>{
    const {data}= await axios.get(`/api/products/${productId}`);
    setProduct(data);
 }
 fetchProduct();
 },[productId]);
 
 console.log(product);
  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    <Row>
        <Col md={5}>
            <Image src={product.image} lt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>Price:Rs.{product.price*85}</ListGroupItem>
                <ListGroupItem>About Product: {product.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                            <strong>Rs.{product.price*85}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? 'Available' : 'Out of stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0}>
                         Add to cart
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default ProductScreen