import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import User from './User';
import Naver from './Naver';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column('int')
  owner_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToMany(() => Naver, naver => naver.projects)
  navers: Naver[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Project;
