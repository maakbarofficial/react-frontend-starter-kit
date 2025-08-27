import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Modal } from '@/components';

const OTPVerification = ({
  isOpen,
  onClose,
  onSuccess,
  phoneNumber = '+923001234567',
  otpLength = 4,
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputRefs = useRef([]);
  const hardcodedOtp = '1234';

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, '');
    if (!value) return;
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // Add animation class
    e.target.classList.add('scale-110', 'transition', 'duration-150');
    setTimeout(() => {
      e.target.classList.remove('scale-110');
    }, 150);
  
    // If not last digit → move focus to next
    if (index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    } else {
      // ✅ Check if all fields filled before verifying
      if (newOtp.every((digit) => digit !== '')) {
        handleVerify(newOtp.join(''));
      } else {
        toast.error("Please enter all digits from the start");
        inputRefs.current[0].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = (enteredOtp) => {
    if (enteredOtp === hardcodedOtp) {
      toast.success('OTP Verified Successfully');
      onSuccess();
      onClose();
    } else {
      toast.error('OTP verification failed');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="OTP Verification"
      showCancelButton={false}
      showConfirmButton={false}
    >
      <div className="text-center space-y-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
          Verify via OTP to perform this action, Enter the OTP sent to <span className="font-bold text-red-500">{phoneNumber}</span>
        </p>

        <div className="flex justify-center gap-3 my-10">
          {otp.map((digit, index) => (
            <input
              placeholder="*"
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-brand rounded-lg text-lg font-bold focus:ring-2 focus:ring-brand focus:border-brand"
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default OTPVerification;
