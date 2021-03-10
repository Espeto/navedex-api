import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';
import Project from './Project';

@Entity('navers')
class Naver {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('date')
  birthdate: Date;

  @Column('date')
  admission_date: Date;

  @Column()
  job_role: string;

  @Column('int')
  owner_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => Project, project => project.navers)
  @JoinTable()
  projects: Project[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Naver;
