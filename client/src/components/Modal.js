import { useDispatch, useSelector } from 'react-redux';
import { setModalData } from "../store/modalSlice";
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';
export default function Modal() {
    const heading = useSelector((store) => store.modal.heading);
    const text = useSelector((store) => store.modal.text);
    const showModal = useSelector((store) => store.modal.showModal);
    const redirectTo = useSelector((store) => store.modal.redirectTo);
    const modalBtnName = useSelector((store) => store.modal.modalBtnName)
    const dispatch = useDispatch();
    return (
        <>
            {showModal ? (
                <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="bg-black bg-opacity-75 fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                    <div className="relative w-full max-w-2xl max-h-full ">
                        <div className="relative bg-white rounded-lg shadow ">
                            <div className="flex items-start justify-between py-5 px-6 border-b rounded-lg">
                                <h3 className="text-xl text-gray-900 font-bold">
                                    {heading}
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                    data-modal-hide="staticModal"
                                    onClick={() => dispatch(setModalData({ showModal: false }))}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="flex overflow-auto py-2 px-6">
                                <p className="text-base font-semibold leading-relaxed text-gray-500">
                                    {text}
                                </p>
                            </div>
                            {
                                modalBtnName ?
                                    <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                                        <Link to={redirectTo}>
                                            <DarkButton props={{
                                                buttonName: modalBtnName,
                                                onClickFunction: () => {
                                                    dispatch(setModalData({showModal: false}))
                                                }
                                            }} />
                                        </Link>
                                    </div>
                                    :
                                    <></>
                                    
                            }
                        </div>
                    </div>
                </div>

            ) : null}
        </>
    );
}
