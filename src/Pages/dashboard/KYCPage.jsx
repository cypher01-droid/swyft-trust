import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Upload,
  Camera,
  FileText,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';
import axios from '@/utils/axios';
import { uploadToImgBB } from '@/utils/imgbb';
import './KYCPage.css';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState('unverified');

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  /* ----------------------------------
     Load existing KYC
  ---------------------------------- */
  useEffect(() => {
    axios.get('/user/me')
      .then(res => {
        if (res.data?.status === 'pending') setStep(4);
        if (res.data?.status === 'verified') setStep(5);
        if (res.data?.status) setKycStatus(res.data.status);
      })
      .catch(() => {});
  }, []);

  /* ----------------------------------
     Submit KYC
  ---------------------------------- */
  const handleSubmitKYC = async () => {
    try {
      setIsUploading(true);

      const [frontUrl, backUrl, selfieUrl] = await Promise.all([
        uploadToImgBB(frontFile),
        uploadToImgBB(backFile),
        uploadToImgBB(selfieFile)
      ]);

      await axios.post('/user/submit', {
        docType,
        frontUrl,
        backUrl,
        selfieUrl
      });

      setKycStatus('pending');
      setStep(4);

    } catch (err) {
      alert(err.response?.data?.message || 'KYC submission failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="kyc-container">
      <header className="page-header">
        <h1>Identity Verification</h1>
        <p>Ensure your account security by completing KYC</p>
      </header>

      <AnimatePresence mode="wait">

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div className="card-glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3>Select Document Type</h3>

            <div className="doc-grid">
              <button className={docType === 'passport' ? 'active' : ''} onClick={() => setDocType('passport')}>
                <FileText /> Passport
              </button>
              <button className={docType === 'id' ? 'active' : ''} onClick={() => setDocType('id')}>
                <UserCheck /> National ID
              </button>
              <button className={docType === 'license' ? 'active' : ''} onClick={() => setDocType('license')}>
                <ShieldCheck /> Driver’s License
              </button>
            </div>

            <button className="primary-btn" disabled={!docType} onClick={() => setStep(2)}>
              Continue <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div className="card-glass">
            <h3>Upload {docType}</h3>

            <div className="upload-zone">
              <label className="upload-box">
                <Upload size={24} />
                <p>{frontFile ? 'Front Uploaded' : 'Front of Document'}</p>
                <input type="file" hidden accept="image/*" onChange={e => setFrontFile(e.target.files[0])} />
              </label>

              <label className="upload-box">
                <Upload size={24} />
                <p>{backFile ? 'Back Uploaded' : 'Back of Document'}</p>
                <input type="file" hidden accept="image/*" onChange={e => setBackFile(e.target.files[0])} />
              </label>
            </div>

            <div className="requirement-note">
              <AlertCircle size={16} />
              Ensure images are clear and readable
            </div>

            <button className="primary-btn" disabled={!frontFile || !backFile} onClick={() => setStep(3)}>
              Next: Selfie Check
            </button>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div className="card-glass">
            <h3>Liveness Check</h3>

            <label className="selfie-frame">
              <Camera size={40} color="var(--accent-purple)" />
              <div className="scan-line" />
              <input type="file" hidden accept="image/*" onChange={e => setSelfieFile(e.target.files[0])} />
            </label>

            <button
              className="primary-btn"
              disabled={!selfieFile || isUploading}
              onClick={handleSubmitKYC}
            >
              {isUploading ? 'Submitting KYC...' : 'Verify Identity'}
            </button>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div className="status-screen">
            <Clock size={60} color="#fcd34d" />
            <h2>Verification Pending</h2>
            <p>Compliance review in progress (12–24 hours)</p>
          </motion.div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <motion.div className="status-screen">
            <CheckCircle2 size={64} color="#22c55e" />
            <h2>KYC Verified</h2>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
