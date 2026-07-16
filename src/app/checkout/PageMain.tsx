"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import ModalSelectDate from "@/components/ModalSelectDate";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import Image from "next/image";
import { GuestsObject } from "../(client-components)/type";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2026/07/24")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2026/07/24"));

  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 0,
    guestInfants: 0,
  });

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Lisbon mates
              </span>
              <span className="text-base font-medium mt-1 block">
                Tour Chiado & Bairro Alto
              </span>
            </div>
            <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Detalhes da sua reserva</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Data:</span>
            <span>{converSelectedDateToString([startDate, endDate])}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Pessoas:</span>
            <span>{`${(guests.guestAdults || 0) + (guests.guestChildren || 0)} Pessoas`}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Sob Consulta</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Confirm and payment</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {`${(guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                          } Guests, ${guests.guestInfants || 0} Infants`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Preencha informações do tour</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
          
          <form action="https://formspree.io/f/xgogoyqq" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>Data *</Label>
                <Input type="text" name="data" defaultValue={converSelectedDateToString([startDate, endDate])} required />
              </div>
              <div className="space-y-1">
                <Label>Horário *</Label>
                <Input type="text" name="horario" placeholder="Ex: 08:00, 19:00" required />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Horas *</Label>
              <Input type="text" name="horas" placeholder="Ex: 2 horas, dia inteiro" required />
            </div>

            <div className="space-y-1">
              <Label>Nome Completo *</Label>
              <Input type="text" name="nome" placeholder="Seu nome" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>E-mail *</Label>
                <Input type="email" name="email" placeholder="seuemail@exemplo.com" required />
              </div>
              <div className="space-y-1">
                <Label>Telefone *</Label>
                <Input type="tel" name="telefone" placeholder="+351..." required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label>País *</Label>
                <Input type="text" name="pais" placeholder="Portugal" required />
              </div>
              <div className="space-y-1">
                <Label>Cidade *</Label>
                <Input type="text" name="cidade" placeholder="Lisboa" required />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Hotel ou ponto de recolha (pode escolher mais tarde) *</Label>
              <Input type="text" name="ponto_recolha" placeholder="Endereço ou nome do hotel" required />
            </div>

            <div className="space-y-1">
              <Label>Conteúdo do Passeio *</Label>
              <Textarea name="conteudo_passeio" placeholder="Algum detalhe ou pedido especial para o seu passeio?" required />
            </div>

            <div className="pt-4">
              <ButtonPrimary type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium">
                Próximo
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
