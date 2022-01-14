import { Controller } from "@hotwired/stimulus";
import Rails from "@rails/ujs";
import tinycolor from "tinycolor2";


export default class extends Controller {
    static get targets() {
        return [ "title", "start", "end", "roomId", "monthLabel", "color", "eventId", "titleLabel" ]
    }

    connect() {
        this.deleteCalendarSchedule()
        this.createCalendarSchedule()
        this.getCalendardata();
        this.updatedCalendarSchedule()
    }

    calendar = new tui.Calendar(document.getElementById('calendar'), {
        id: "1",
        defaultView: 'week',
        taskView: false,
        milestone: false,    // Can be also ['milestone', 'task']
        scheduleView: ['time'],  // Can be also ['allday', 'time']
        useCreationPopup: false,
        useDetailPopup: true,
        template: {
            time: function(schedule) {
                // console.log(schedule);
                console.log(schedule)
                return schedule.title;
            },
            popupDetailDate: function(schedule) {
                console.log(schedule)
                return `${schedule.start._date.toString()} -> ${schedule.end._date.toString()}`;
            }
        },
        month: {
            daynames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            startDayOfWeek: 1,
            narrowWeekend: false
        },
        week: {
            daynames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            startDayOfWeek: 1,
            narrowWeekend: true
        }
    });
    getCalendardata(){
        const events = JSON.parse(document.querySelector("#calendar").dataset.events);
        window.events = events;

        events.forEach(event => {
            const color = tinycolor(event.color || '#00a9ff')
            this.calendar.createSchedules([
                {
                    id: event.id,
                    calendarId: '1',
                    title: event.title,
                    category: 'time',
                    start: event.start_time,
                    end: event.end_time,
                    color: color.isDark() ? 'white' : 'black',
                    bgColor: color.saturate().toString(),
                    dragBgColor: color.darken().desaturate().toString(),
                    borderColor: color.toString(),
                    raw: event,

                }
            ])
        });
    }

    dateToValue(date) {
        const year = date.getFullYear();
        const month = ('0' + date.getMonth() + 1).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);

        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    triggerEventCreation(event) {
        this.startTarget.value = this.dateToValue(event.start.toDate())
        this.endTarget.value = this.dateToValue(event.end.toDate())
        this.toggleModal();
        document.getElementById('title').focus();
    }

    toggleModal() {
        document.getElementById('modal-id').classList.toggle("hidden");
        document.getElementById('modal-id' + "-backdrop").classList.toggle("hidden");
        document.getElementById('modal-id').classList.toggle("flex");
        document.getElementById('modal-id' + "-backdrop").classList.toggle("flex");
    }

    createCalendarSchedule(){
        let calendar = this.calendar;
        const triggerEventCreation = this.triggerEventCreation.bind(this);
        calendar.on('beforeCreateSchedule', function(event) {
            const triggerEventName = event.triggerEventName;

            if (triggerEventName === 'click') {
                console.log('LA CEST UN CLICK')
                console.log(event)
                // open writing simple schedule popup
                // schedule = {...};
            } else if (triggerEventName === 'dblclick') {
                console.log('LA CEST UN DOUBLE CLICK')
                console.log(event)
                // open writing detail schedule popup
                // schedule = {...};
            } else if (triggerEventName === 'mouseup') {
                triggerEventCreation(event);
            }

        });
    }

    updatedCalendarSchedule() {
        let calendar = this.calendar;
        const updateDistant = this.updateDistant;
        const setFormValue = this.setFormValue.bind(this);
        const toggleModal = this.toggleModal.bind(this);
        calendar.on('beforeUpdateSchedule', function(event) {
            const { schedule, changes, triggerEventName } = event;
            if (triggerEventName && triggerEventName === 'click') {
                setFormValue(schedule);
                toggleModal();
            } else {
                updateDistant(schedule, changes);
            }

            calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
        });
    }

    setFormValue(schedule) {
        const { raw, start, end } = schedule;
        const { color, id, room_id, title } = raw;
        this.eventIdTarget.value = id;
        this.titleTarget.value = title;
        this.colorTarget.value = color;
        this.startTarget.value = this.dateToValue(start.toDate());
        this.endTarget.value = this.dateToValue(end.toDate());
        this.roomIdTarget.value = room_id;
        this.titleLabelTarget.innerText = title;
    }

    updateDistant(schedule, changes) {
        const formUpdate = new FormData()
        if (changes.end) {
            formUpdate.append("end_time", changes.end._date)
        }
        if (changes.start) {
            formUpdate.append("start_time", changes.start._date)
        }

        Rails.ajax({
            type: "PATCH",
            url: '/events/'+ schedule.id + '.json',
            data: formUpdate
        })

    }

    deleteCalendarSchedule(){
        let calendar = this.calendar
        const deleteDistant = this.deleteDistant.bind(this);
        calendar.on('beforeDeleteSchedule', function(event) {
            const schedule = event.schedule;
            calendar.deleteSchedule(schedule.id, schedule.calendarId)
            deleteDistant(event);
        });
    }

    deleteDistant(schedule) {
        Rails.ajax({
            type: "DELETE",
            url: '/events/'+ schedule.schedule.id + '.json',
        })
    }


    refreshDate() {

    }

    next() {
        this.calendar.next();
    }

    prev() {
        this.calendar.prev();
    }

    today() {
        this.calendar.today();
    }
}
