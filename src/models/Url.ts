import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("urls")
class Url {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // If creating a new one
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Url };