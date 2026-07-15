import React, { FC, Fragment, useState } from "react";
import CheckOutPagePageMain from "@/app/checkout/PageMain";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ModalSelectDate from "@/components/ModalSelectDate";
import Input from "@/shared/Input";
import Label from "@/components/Label";

interface ModalReserveMobileProps {
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode;
}

const ModalReserveMobile: FC<ModalReserveMobileProps> = ({
  renderChildren,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date("2023/02/06"));

  function closeModal() {
    setShowModal(false);
    setStep(1);
  }

  function openModal() {
    setShowModal(true);
    setStep(1);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Reserve</button>
    );
  };

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900 p-6">
                        {step === 1 ? (
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Reserve</h3>
                            <div>
                              <label className="block text-sm text-neutral-500">Date</label>
                              <div className="mt-2">
                                <ModalSelectDate
                                  single
                                  onSave={(d) => setSelectedDate(d)}
                                  renderChildren={({ openModal }) => (
                                    <button
                                      onClick={openModal}
                                      type="button"
                                      className="w-full text-left px-4 py-3 border rounded-lg"
                                    >
                                      {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                                    </button>
                                  )}
                                />
                              </div>
                            </div>

                            <div>
                              <Label text="Full name" />
                              <Input value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
                            </div>

                            <div>
                              <Label text="Email" />
                              <Input value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
                            </div>

                            <div>
                              <Label text="Phone" />
                              <Input value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} />
                            </div>

                            <div className="flex items-center justify-between">
                              <button className="underline" onClick={closeModal} type="button">Cancel</button>
                              <button
                                className="px-4 py-2 bg-neutral-800 text-white rounded-lg"
                                onClick={() => setStep(2)}
                                type="button"
                                disabled={!form.name || !form.email}
                              >
                                Continue to payment
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-xl font-semibold mb-4">Payment</h3>
                            <CheckOutPagePageMain initialDate={selectedDate} />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalReserveMobile;
