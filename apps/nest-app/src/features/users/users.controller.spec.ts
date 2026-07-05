import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mock<UsersService>(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call usersService.create with correct params', () => {
      const createUserDto = { name: 'John' };
      controller.create(createUserDto as any);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with correct id', () => {
      const id = '1';
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call usersService.update with correct params', () => {
      const id = '1';
      const updateUserDto = { name: 'Jane' };
      controller.update(id, updateUserDto);
      expect(service.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with correct id', () => {
      const id = '1';
      controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
