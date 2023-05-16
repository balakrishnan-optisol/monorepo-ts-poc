import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class PrimaryEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export class AuditableEntity extends PrimaryEntity {
  @Column('timestamp', { default: null })
  @DeleteDateColumn()
  deleted_at: Date;

  @Column('timestamp')
  @CreateDateColumn()
  created_at: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at: Date;
}
