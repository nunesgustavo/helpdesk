import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket.model';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable()
export class TicketService {
  TICKET_PATH: string = '/api/ticket';

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id != '') {
      return this.http.put(`${HELP_DESK_API}${this.TICKET_PATH}`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(`${HELP_DESK_API}${this.TICKET_PATH}`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}${this.TICKET_PATH}/${page}/${count}`);
  }

  findById(id: string) {
    return this.http.get(`${HELP_DESK_API}${this.TICKET_PATH}/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${HELP_DESK_API}${this.TICKET_PATH}/${id}`);
  }

  findByParams(page: number, count: number, assignedToMe: boolean, ticket:Ticket) {
    ticket.number = ticket.number == null ? 0 : ticket.number;
    ticket.title = ticket.title == '' ? 'uninformed' : ticket.title;
    ticket.status = ticket.status == '' ? 'uninformed' : ticket.status;
    ticket.priority = ticket.priority == '' ? 'uninformed' : ticket.priority;
    return this.http.get(`${HELP_DESK_API}${this.TICKET_PATH}/${page}/${count}/${ticket.number}/${ticket.title}/${ticket.status}/${ticket.priority}/${assignedToMe}`);
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.http.put(`${HELP_DESK_API}${this.TICKET_PATH}/${ticket.id}/${status}`, ticket);
  }

  summary() {
    return this.http.get(`${HELP_DESK_API}${this.TICKET_PATH}/summary`);
  }
}
