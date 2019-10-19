import React from 'react';
import EditOfferForm from './EditOfferForm';
import Modal from '../../common/Modal';

const EditOfferContainer = ({ showModal, modalClosed }) => {
	return <Modal showModal={showModal} modalClosed={modalClosed} Component={EditOfferForm} title="Edit Offer" />;
};

export default EditOfferContainer;
