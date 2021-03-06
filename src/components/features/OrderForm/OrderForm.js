import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
//import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../settings';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripDetails,) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    ...tripDetails,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const validateOrderData = (props) => {
  if (props.options.name && props.options.contact) {
    sendOrder(
      props.options, 
      props.tripCost,
      props.tripDetails
    );
    window.alert(settings.message.confirm);
  } else {
    window.alert(settings.message.error);
  }
};

const OrderForm = (props) => (
  <Row>
    {pricing.map((pricingOption) => (
      <Col md={4} key={pricingOption.id}>
        <OrderOption
          key={pricingOption.id}
          currentValue={props.options[pricingOption.id]}
          setOrderOption={props.setOrderOption}
          {...pricingOption}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary cost={props.tripCost} options={props.options} />
      <Button onClick={() => validateOrderData(props) }>Order now!</Button>
    </Col>
    
  </Row>
);


OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripDetails: PropTypes.object,
};

export default OrderForm;