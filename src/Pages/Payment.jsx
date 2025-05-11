import React, { useState, useEffect } from 'react';
import { FiCheck, FiLock, FiShield, FiCreditCard, FiDollarSign, FiX, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('esewa');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentError, setPaymentError] = useState('');
  const navigate = useNavigate();

  // const mockCartItems = [
  //   { name: 'Edge Lite 6', price: 1977.0 },
  //   { name: 'iRead Mini', price: 499.0 }
  // ];

  // useEffect(() => {
  //   setCartItems(mockCartItems);
  // }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
  if (selectedPayment === 'khalti') {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/payment/init/?amount=100');
      const data = await response.json();

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setPaymentStatus('error');
        setPaymentError('Payment URL not found.');
        console.error('Invalid response:', data);
      }
    } catch (error) {
      setPaymentStatus('error');
      setPaymentError('Something went wrong. Please try again.');
      console.error('Error fetching payment URL:', error);
    } finally {
      setLoading(false);
    }
    return;
  }

  // For Cash on Delivery
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setPaymentStatus('success');
  }, 1500);
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-700">Processing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FiCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment of ¥ {subtotal.toFixed(2)} has been processed successfully.</p>
          <button
            onClick={() => {
              setPaymentStatus(null);
            }}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <FiX className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-2">{paymentError}</p>
          <p className="text-sm text-gray-500 mb-6">Please check your details and try again.</p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Payment Details</h1>
            <p className="text-sm text-gray-500 mt-1">Complete your purchase securely</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-800">¥ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="font-medium text-gray-700">Total Amount</span>
              <span className="text-lg font-semibold text-gray-900">रु 100</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Payment Method</h2>

            {/* Khalti */}
            <div
              className={`p-4 border rounded-md cursor-pointer transition-all mb-3 ${
                selectedPayment === 'khalti' ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPayment('khalti')}
            >
              <div className="flex items-start">
                <div
                  className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedPayment === 'khalti' ? 'bg-gray-700 border-gray-700' : 'border-gray-400'
                  }`}
                >
                  {selectedPayment === 'khalti' && <FiCheck className="text-white text-xs" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">Khalti</h3>
                    <FiDollarSign className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              className={`p-4 border rounded-md cursor-pointer transition-all ${
                selectedPayment === 'card' ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPayment('card')}
            >
              <div className="flex items-start">
                <div
                  className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedPayment === 'card' ? 'bg-gray-700 border-gray-700' : 'border-gray-400'
                  }`}
                >
                  {selectedPayment === 'card' && <FiCheck className="text-white text-xs" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">Cash On Delivery</h3>
                    <FiCreditCard className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
              disabled={loading}
              onClick={handlePayment}
            >
              <FiShield className="mr-2" />
              {selectedPayment === 'khalti' ? 'Pay with Khalti' : 'Pay Now'}
            </button>
            <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
              <FiLock className="mr-1.5" />
              <span>Secure SSL encrypted payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
