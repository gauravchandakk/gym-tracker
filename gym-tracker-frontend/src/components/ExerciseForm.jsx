import React, { useEffect, useState } from 'react';
import { getTodayDate, MUSCLE_GROUPS } from '../utils/helpers';

const initialFormState = {
  exerciseName: '',
  muscleGroup: 'Chest',
  sets: '',
  reps: '',
  weight: '',
  date: getTodayDate(),
  notes: '',
};

// ExerciseForm handles both adding and editing exercise entries.
function ExerciseForm({ initialValues = initialFormState, mode = 'add', onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);
  const [validated, setValidated] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setFormData({
      ...initialFormState,
      ...initialValues,
      date: initialValues?.date ? String(initialValues.date).slice(0, 10) : getTodayDate(),
    });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      ...initialFormState,
      date: getTodayDate(),
    });
    setValidated(false);
    setToastMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setToastMessage('');
    setErrorMessage('');

    try {
      await onSubmit({
        ...formData,
        sets: Number(formData.sets),
        weight: formData.weight === '' ? null : Number(formData.weight),
      });
      setToastMessage(mode === 'add' ? 'Exercise saved successfully.' : 'Exercise updated successfully.');
      if (mode === 'add') {
        resetForm();
      }
    } catch (submitError) {
      setErrorMessage(submitError?.response?.data?.message || submitError.message || 'Unable to save exercise.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-7">
        <div className="card shadow">
          <div className="card-header bg-white">
            <h1 className="h4 mb-0">{mode === 'add' ? 'Save Exercise' : 'Update Exercise'}</h1>
          </div>
          <div className="card-body">
            {toastMessage ? (
              <div className="toast-container position-fixed top-0 end-0 p-3">
                <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                  <div className="d-flex">
                    <div className="toast-body">{toastMessage}</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => setToastMessage('')} />
                  </div>
                </div>
              </div>
            ) : null}
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
            <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="exerciseName" className="form-label">
                    Exercise Name
                  </label>
                  <input
                    id="exerciseName"
                    name="exerciseName"
                    type="text"
                    className="form-control"
                    value={formData.exerciseName}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Exercise name is required.</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="muscleGroup" className="form-label">
                    Muscle Group
                  </label>
                  <select
                    id="muscleGroup"
                    name="muscleGroup"
                    className="form-select"
                    value={formData.muscleGroup}
                    onChange={handleChange}
                  >
                    {MUSCLE_GROUPS.map((muscleGroup) => (
                      <option key={muscleGroup} value={muscleGroup}>
                        {muscleGroup}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="sets" className="form-label">
                    Number of Sets
                  </label>
                  <input
                    id="sets"
                    name="sets"
                    type="number"
                    className="form-control"
                    min="1"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please enter at least 1 set.</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="reps" className="form-label">
                    Reps per Set
                  </label>
                  <input
                    id="reps"
                    name="reps"
                    type="text"
                    className="form-control"
                    placeholder="10,12,10"
                    value={formData.reps}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="weight" className="form-label">
                    Weight in kg
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    className="form-control"
                    min="0"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please choose a date.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  {mode === 'add' ? 'Save Exercise' : 'Update Exercise'}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={mode === 'add' ? resetForm : onCancel}>
                  {mode === 'add' ? 'Reset' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseForm;