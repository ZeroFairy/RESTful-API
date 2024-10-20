<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function index()
    {
        $data = [
            'message' => 'success',
            'data_user' => $this->model->orderBy('id', 'ASC')->findAll()
        ];

        return $this->respond($data, 200);
    }

    /**
     * Return the properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function show($id = null, $password = null)
    {
        $user = $this->model->select('nama, email, password')->find($id);

        if ($user == null) {
            return $this->FailNotFound('Data user not found');
        }
        
        if (password_verify($password, $user['password'])) {
            $data = [
                'message' => 'success',
                'user_name'  => $user['nama'],
                'user_email'  => $user['email']
            ];

            return $this->respond($data,200);
        } else {
            $data = [
                'message' => 'error'
            ];
            return $this ->respond($data,401);
        }


    }

    /**
     * Return a new resource object, with default properties.
     *
     * @return ResponseInterface
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters.
     *
     * Data yang diinput adalah nama, email, password
     * 
     * Password yang diinput akan dilakukan encrypttion, setelah itu baru simpan dalam database
     * @return ResponseInterface
     */
    public function create()
    {
        $rules = $this->validate([
            'nama' => 'required',
            'email' => 'required',
            'password' => 'required|min_length[8]'
        ]);

        if (!$rules) {
            $response = [
                'message' => $this->validator->getErrors()
            ];

            return $this->failValidationErrors($response);
        }

        $password = esc($this->request->getVar('password'));
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $this->model->insert([
            'nama' => esc($this->request->getVar('nama')),
            'email' => esc($this->request->getVar('email')),
            'password' => $hashedPassword
        ]);

        $response = [
            'message' => 'Data User Berhasil Dibuat'
        ];

        return $this->respondCreated($response);
    }

    /**
     * Return the editable properties of a resource object.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function update($id = null)
    {
        $rules = $this->validate([
            'nama' => 'required',
            'password' => 'required|min_length[8]'
        ]);

        if (!$rules) {
            $response = [
                'message' => $this->validator->getErrors()
            ];

            return $this->failValidationErrors($response);
        }

        $this->model->update($id, [
            'nama' => esc($this->request-getVar('nama')),
            'password' => esc($this->request-getVar('password'))
        ]);

        $response = [
            'message' => 'Data User Berhasil Diubah'
        ];

        return $this->respond($response, 200);
    }

    /**
     * Delete the designated resource object from the model.
     *
     * @param int|string|null $id
     *
     * @return ResponseInterface
     */
    public function delete($id = null)
    {
        $this->model->delete($id);

        $response = [
            'message' => 'Data User Berhasil Dihapus'
        ];

        return $this->respondDeleted($response);
    }
}
