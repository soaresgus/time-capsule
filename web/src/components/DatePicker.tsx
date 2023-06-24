'use client'

import { useCalendar } from '@vkbansal/react-date-primitives'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

interface IDatePickerProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export function DatePicker({
  selectedDate,
  setSelectedDate,
}: IDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { days, month, nextMonth, prevMonth } = useCalendar()

  const monthName = MONTH_NAMES[month.getMonth()]

  return (
    <Popover.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="relative">
        <Popover.Trigger asChild>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Calendar className="h-4 w-4" />
            {dayjs(selectedDate).format('DD/MM/YYYY')}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content sideOffset={20}>
            <div className="w-[280px] rounded-lg bg-gray-700 p-2 text-gray-100">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="rounded-full p-2 text-gray-200 transition-colors hover:bg-gray-500 hover:text-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div>
                  {monthName}, {month.getFullYear()}
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="rounded-full p-2 text-gray-200 transition-colors hover:bg-gray-500 hover:text-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Dom
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Seg
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Ter
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Qua
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Qui
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Sex
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full">
                  Sab
                </div>
              </div>
              <div className="grid grid-cols-7">
                {days.map((day, i) => (
                  <div
                    data-active-month={day.inCurrentMonth}
                    data-selected={selectedDate}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-500 data-[active-month=false]:opacity-70 ${
                      dayjs(selectedDate).startOf('day').isSame(day.dateObj) &&
                      'bg-purple-500 hover:bg-purple-500'
                    }`}
                    key={i}
                    onClick={() => {
                      day.inCurrentMonth && setSelectedDate(day.dateObj)
                      setIsOpen(false)
                    }}
                  >
                    {day.dateObj.getDate()}
                  </div>
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  )
}
