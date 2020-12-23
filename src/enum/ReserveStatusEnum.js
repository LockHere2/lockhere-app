export default {
    SCHEDULED: 'scheduled',
    INUSE: 'inuse',
    CANCELED: 'canceled',
    DONE: 'done',
    toArray() { return [this.SCHEDULED, this.INUSE, this.CANCELED, this.DONE] },
    toArrayDropdown() {
        return [
            { label: 'Agendado', value: this.SCHEDULED },
            { label: 'Em uso', value: this.INUSE },
            { label: 'Cancelado', value: this.CANCELED },
            { label: 'Finalizado', value: this.DONE }
        ]
    },
    isStatusValid(status) {
        return this.toArray().includes(status);
    } 
}