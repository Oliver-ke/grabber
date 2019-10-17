import React from 'react';
import EditDiscountForm from './EditForm';
import Modal from '../../common/Modal';

const EditDiscountContainer = ({ showModal, modalClosed }) => {
	return <Modal showModal={showModal} modalClosed={modalClosed} Component={EditDiscountForm} title="Edit Deal" />;
};

export default EditDiscountContainer;
