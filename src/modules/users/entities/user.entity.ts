import { passwordEncoder } from '@src/common/decorators/encodePassord.decorator';
import { BaseEntity } from '@src/modules/bases/entities/base.entity';
import { Role } from '@src/modules/roles/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 60, nullable: true })
  userName?: string;

  @Column({ type: 'varchar', length: 45, unique: true, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    length: 72,
    nullable: false,
  })
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false, eager: true })
  @JoinTable()
  role: Role;

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await passwordEncoder.hash(this.password);
    }
  }

  @BeforeUpdate()
  private async updatePassword(): Promise<void> {
    if (this.password) {
      this.password = await passwordEncoder.hash(this.password);
    }
  }
}
