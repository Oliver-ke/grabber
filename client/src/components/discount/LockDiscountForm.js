import React, { useState } from "react";
import { connect } from "react-redux";
import { saveUserDiscount } from "../../actions/userDiscount";
import { Form, Input, Button, Alert } from "antd";
import payMonify from "../../util/payMonify";

const LockDiscountForm = ({
  saveUserDiscount,
  closeModal,
  cancel,
  discount
}) => {
  const { loading, discountDetail, totalLockPrice } = discount;
  const [formInputs, setFormInputs] = useState({
    email: "",
    phone: "",
    school: ""
  });

  const [error, setError] = useState("");
  const handleInput = e => {
    const { value, name } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value
    });
  };
  const formSubmit = async e => {
    e.preventDefault();
    const { email, phone, school } = formInputs;
    if (!email || !phone || !school) {
      return setError("Please fill all available fields");
    }
    const { id } = discountDetail;
    const paidFor = { ...formInputs, ...totalLockPrice, dealId: id };
    const response = await payMonify({
      amount: totalLockPrice.lockOfferPrice,
      email,
      name: school,
      phoneNumber: phone,
      paidFor
    });
    console.log(response);
    // saveUserDiscount(detail);
    // if (!loading) {
    // 	closeModal();
    // }
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <Form {...formItemLayout} onSubmit={formSubmit}>
      {error ? (
        <Alert
          message={error}
          type="error"
          closable
          afterClose={() => setError("")}
        />
      ) : null}
      <Form.Item label="Your Email">
        <Input
          type="email"
          onChange={handleInput}
          value={formInputs.email}
          name="email"
          style={{ width: "80%" }}
          placeholder="email"
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="number"
          onChange={handleInput}
          value={formInputs.phone}
          name="phone"
          style={{ width: "80%" }}
          placeholder="Phone number"
        />
      </Form.Item>
      <Form.Item label="School Name">
        <Input
          type="text"
          onChange={handleInput}
          value={formInputs.school}
          name="school"
          style={{ width: "80%" }}
          placeholder="school name"
        />
      </Form.Item>
      <hr />
      <div style={{ textAlign: "right" }}>
        <Button type="primary" loading={loading} htmlType="submit">
          Proceed
        </Button>
        <Button onClick={cancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = state => ({
  discount: state.userDiscount
});

export default connect(mapStateToProps, { saveUserDiscount })(LockDiscountForm);
