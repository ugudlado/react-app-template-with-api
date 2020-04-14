import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import Profile from '../models/Profile'

@EventSubscriber()
export class ProfileSubscriber implements EntitySubscriberInterface<Profile> {
  public listenTo() {
    return Profile
  }

  public async afterInsert(event: InsertEvent<Profile>) {}
}
