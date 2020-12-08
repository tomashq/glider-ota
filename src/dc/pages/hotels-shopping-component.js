import React from 'react';
import HotelSearchForm from '../components/search-form/hotel-search-form'
import HotelFilters from "../components/filters/hotel-filters";
import HotelsSearchResults from "../components/hotelresults/hotels-search-results";
import {Col, Row} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import ShoppingCart from "../components/shoppingcart/shopping-cart";

export default function HotelsShoppingComponent() {
    return (
        <div>
            <Row>
                <HotelSearchForm/>
            </Row>
            <Row>
                <Col xs={0} sm={0} md={3} xl={0} className='d-none d-md-block'>
                    <HotelFilters/>
                </Col>
                <Col xs={12} sm={9} md={6} xl={6}>
                    <HotelsSearchResults/>
                </Col>
                <Col xs={0} sm={3} md={3} xl={3}>
                    <ShoppingCart/>
                </Col>
            </Row>

        </div>
    )
}

const WarningNoResults = () => {
    return (
        <Alert variant="warning" className={'pt-2'}>
            <Alert.Heading>
                Sorry, we could not find any flights
                <span role='img' aria-label='sorry'> 😢</span>
            </Alert.Heading>
            <p>
                There may be no flights available for the requested origin, destination and travel dates.<br/>
            </p>
            <p className="mb-0">
                We are working hard to integrate with other partners, and more options will quickly become available,
                stay tuned!
            </p>
        </Alert>
    );
};

function searchForFlightsWithCriteria() {

}



